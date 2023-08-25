from urllib.parse import urlencode, urljoin

from django.conf import settings


def build_front_url(path, params=None):
    params = params or {}
    url = urljoin(settings.FRONTEND_URL, path)
    return f"{url}?{urlencode(params)}" if params else url
