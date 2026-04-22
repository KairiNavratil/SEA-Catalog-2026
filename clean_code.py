import re

# Clean HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# remove twitchdle link
html = re.sub(r'\s*<a href="twitchdle\.html".*?</a>', '', html, flags=re.DOTALL)
# remove comments
html = re.sub(r'<!--.*?-->', '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Clean CSS
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# remove block comments
css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

import os
if os.path.exists('twitchdle.html'):
    os.remove('twitchdle.html')
print('Cleaned files.')
