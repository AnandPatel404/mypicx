import Lock from 'ioredfour';
import Redis from 'ioredis';
const redis = new Redis();
const planLock = new Lock({
	redis: redis,
	namespace: 'txnlock',
});

export { planLock };
