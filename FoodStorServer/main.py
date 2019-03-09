from aiohttp import web
from routes import setup_routes
from aiohttp_security import SessionIdentityPolicy
from aiohttp_security import authorized_userid
from aiohttp_security import setup as setup_security
from aiohttp_session import setup as setup_session
from aiohttp_session.redis_storage import RedisStorage
import aioredis
import logging

log = logging.getLogger(__name__)

async def init_app(config):
    app = web.Application()
    app['config'] = config
    setup_routes(app)
    #db_pool = await init_db(app)
    #redis_pool = await setup_redis(app)
    #setup_session(app, RedisStorage(redis_pool))
    setup_security(
        app,
        SessionIdentityPolicy(),
        DBAuthorizationPolicy(db_pool)
    )
    log.debug(app['config'])

    return app

async def current_user_ctx_processor(request):
    username = await authorized_userid(request)
    is_anonymous = not bool(username)
    return {'current_user': {'is_anonymous': is_anonymous}}

def main(configpath):
    config = load_config(configpath)
    logging.basicConfig(level=logging.DEBUG)
    app = init_app(config)
    web.run_app(app)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--config", help="Provide path to config file")
    args = parser.parse_args()

    if args.config:
        main(args.config)
    else:
        parser.print_help()