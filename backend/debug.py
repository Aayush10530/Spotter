import urllib.request
import urllib.error

try:
    print(urllib.request.urlopen('http://localhost:8001/api/health/').read().decode())
except urllib.error.HTTPError as e:
    print(e.read().decode())
