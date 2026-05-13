import urllib.request
import json
import ssl

url = "https://api.supabase.com/v1/projects/uxomyjxrwhnypsvnjxjn/query"
headers = {
    "Authorization": "Bearer sb_publishable_ch9H4C0rawDz2FdPQWZLQw_uwJoH2Ln",
    "Content-Type": "application/json"
}

sql = """
create extension if not exists "uuid-ossp";

-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for biolink pages
create table if not exists biolink_pages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  slug text unique not null,
  title text,
  bio text,
  theme text default 'default',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table biolink_pages enable row level security;

create policy "Biolink pages are viewable by everyone." on biolink_pages
  for select using (true);

create policy "Users can insert their own biolink page." on biolink_pages
  for insert with check (auth.uid() = user_id);

create policy "Users can update own biolink page." on biolink_pages
  for update using (auth.uid() = user_id);

create policy "Users can delete own biolink page." on biolink_pages
  for delete using (auth.uid() = user_id);

-- Create a table for biolink links
create table if not exists biolink_links (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references biolink_pages(id) on delete cascade not null,
  title text not null,
  url text not null,
  icon text,
  "order" integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table biolink_links enable row level security;

create policy "Links are viewable by everyone." on biolink_links
  for select using (true);

create policy "Users can manage links for their own pages." on biolink_links
  for all using (
    exists (
      select 1 from biolink_pages
      where biolink_pages.id = biolink_links.page_id
      and biolink_pages.user_id = auth.uid()
    )
  );

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars')
  on conflict (id) do nothing;

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar." on storage.objects
  for update with check (bucket_id = 'avatars');
"""

data = json.dumps({"query": sql}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers=headers, method='POST')
context = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=context) as response:
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {response.read().decode('utf-8')}")
except urllib.error.HTTPError as e:
    print(f"Status Code: {e.code}")
    print(f"Response: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
