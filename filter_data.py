import json
import os

with open('twitchData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Original records: {len(data)}")

avatars = set(os.listdir('avatars'))

cleaned = []
for d in data:
    channel = d['Channel']
    if f"{channel}.png" in avatars:
        cleaned.append(d)

print(f"Cleaned records: {len(cleaned)}")

with open('twitchData.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, indent=4)

with open('twitchData.js', 'w', encoding='utf-8') as f:
    f.write('const streamers = ')
    json.dump(cleaned, f, indent=4)
    f.write(';')
