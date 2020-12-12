#!/usr/local/bin/python3
import sys

if len(sys.argv) == 1:
    print('Error: Pass a profile name as first argument.')
    exit(1)

import json
from instaloader import Instaloader, Profile

PROFILE = sys.argv[1]

L = Instaloader()

profile = Profile.from_username(L.context, PROFILE)

posts_sorted_by_likes = sorted(profile.get_posts(),
                               key=lambda p: p.likes + p.comments,
                               reverse=True)

class ReturnType(object):
    def __init__(self, url, likes):
        self.url = url
        self.likes = likes
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

def clean(T):
  return {"url": "https://www.instagram.com/p/" + T.shortcode,
          "likes": T.likes}

posts = list(map(clean, posts_sorted_by_likes))

print(json.dumps(posts))

conn = psycopg2.connect(dsn)


#for post in posts_sorted_by_likes:
    #print("https://www.instagram.com/p/" + post.shortcode + "    Likes:" + str(post.likes))
