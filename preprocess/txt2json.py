# read in the day_map.txt file and convert it to a dictionary
# each line is a key value pair delimited by "="
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(ROOT, 'day_map.txt')) as f:
    content = f.readlines()
content = [x.strip() for x in content]
day_map = {}
for line in content:
    key, value = line.split("=")
    day_map[key] = value

print(day_map)

with open(os.path.join(ROOT, 'night_map.txt')) as f:
    content = f.readlines()
content = [x.strip() for x in content]
night_map = {}
for line in content:
    key, value = line.split("=")
    night_map[key] = value

print(night_map)