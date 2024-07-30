import aiohttp
from bs4 import BeautifulSoup
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from database.models.business import Business
from config import Config

DATABASE_URL = Config.SQLALCHEMY_DATABASE_URI
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def parse_bizbuysell(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

async def parse_flippa(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

async def parse_apollo(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

async def scrape_business_info(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            response_text = await response.text()
            soup = BeautifulSoup(response_text, 'html.parser')

            if 'bizbuysell.com' in url:
                data = await parse_bizbuysell(soup)
            elif 'flippa.com' in url:
                data = await parse_flippa(soup)
            elif 'apollo.io' in url:
                data = await parse_apollo(soup)
            else:
                raise ValueError("Unsupported site")

            async with AsyncSessionLocal() as session:
                async with session.begin():
                    business = Business(
                        name='Business Name',
                        cashflow=data['cashflow'],
                        sde=data['sde'],
                        revenue=data['revenue'],
                        profit_margin=data['profit_margin'],
                        multiple=data['multiple'],
                        location=data['location']
                    )
                    session.add(business)
                await session.commit()

            return business