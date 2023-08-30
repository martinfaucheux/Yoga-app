from datetime import datetime
from urllib.parse import urlencode, urljoin

import pytz
from django.conf import settings


def build_front_url(path, params=None):
    params = params or {}
    url = urljoin(settings.FRONTEND_URL, path)
    return f"{url}?{urlencode(params)}" if params else url


def format_date(dt: datetime):
    fr_tz = pytz.timezone("Europe/Paris")
    localized_time = fr_tz.localize(dt)
    return localized_time.strftime("%d/%m/%Y %H:%M:%S")
