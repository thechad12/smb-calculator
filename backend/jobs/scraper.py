
from aiolimiter import AsyncLimiter
from urllib.parse import urlparse
import asyncio
import aiohttp
import logging
import time
from pprint import pprint as pp
import random
import aiofiles

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
log_handler = logging.StreamHandler()

async def HTTPClientDownloader(url, settings, state, biz_type=None):
    host = urlparse(url).hostname
    max_tcp_connections = settings['max_tcp_connections']

    async with settings['rate_per_host'][host]["limit"]:
        connector = aiohttp.TCPConnector(limit=max_tcp_connections)

        async with aiohttp.ClientSession(connector=connector) as session:
            start_time = time.perf_counter()  # Start timer
            safari_agents = [
                'Safari/17612.3.14.1.6 CFNetwork/1327.0.4 Darwin/21.2.0',
            ]
            user_agent = random.choice(safari_agents)

            headers = {
                'User-Agent': user_agent
            }

            proxy = None
            html = None
            async with session.get(url, proxy=proxy, headers=headers) as response:
                html = await response.text()
                end_time = time.perf_counter()  # Stop timer
                elapsed_time = end_time - start_time  # Calculate time taken to get response
                status = response.status

                logger.info(
                    msg=f"status={status}, url={url}",
                    extra={
                        "elapsed_time": f"{elapsed_time:4f}",
                    }
                )

                dir = "./data"
                idx = url.split(
                    f"https://www.bizbuysell.com/{state}-businesses-for-sale/")[-1]
                loc = f"{dir}/bizbuysell-{state}-{idx}.html"

                async with aiofiles.open(loc, mode="w")  as fd:
                    await fd.write(html)


async def dispatch(url, settings, state, biz_type=None):
    await HTTPClientDownloader(url, settings, state, biz_type=biz_type)

async def main(start_urls, settings, state, biz_type=None):
    tasks = []
    for url in start_urls:
        task = asyncio.create_task(dispatch(url, settings, state, biz_type=biz_type))
        tasks.append(task)

    results = await asyncio.gather(*tasks)
    print(f"total requests", len(results))


async def run_scraper(state, page_limit, biz_type=None):
    state = state.lower().replace(' ', '-')
    settings = {
        "max_tcp_connections": 1,
        "proxies": [
            "http://localhost:8765",
        ],
        "rate_per_host": {
            'www.bizbuysell.com': {
                # Prevent bot denials
                "limit": AsyncLimiter(10, 60), # 10 reqs/min
            },
        }
    }

    start_urls = []
    start, end = 1, page_limit
    for i in range(start, end):
        url = f"https://www.bizbuysell.com/{state}-businesses-for-sale/{i}"
        start_urls.append(url)

    asyncio.run(main(start_urls, settings, state, biz_type=biz_type))
