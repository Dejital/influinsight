#!/usr/local/bin/python3
import sys

if len(sys.argv) == 1:
    print('Error: Pass a profile name as first argument.')
    exit(1)

from instaloader import Instaloader, Profile

PROFILE = sys.argv[1]

L = Instaloader()

profile = Profile.from_username(L.context, PROFILE)

posts_sorted_by_likes = sorted(profile.get_posts(),
                               key=lambda p: p.likes + p.comments,
                               reverse=True)

for post in posts_sorted_by_likes:
    print("https://www.instagram.com/p/" + post.shortcode + "    Likes:" + str(post.likes))
