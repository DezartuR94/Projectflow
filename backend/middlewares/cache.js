const cache = new Map();

function cacheResponse(duration = 5000) {
  return (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse && Date.now() - cachedResponse.createdAt < duration) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cachedResponse.data);
    }

    const originalJson = res.json.bind(res);

    res.json = (data) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          data,
          createdAt: Date.now(),
        });
      }

      res.setHeader("X-Cache", "MISS");
      return originalJson(data);
    };

    next();
  };
}

function invalidateCache(req, res, next) {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    cache.clear();
  }

  next();
}

module.exports = {
  cacheResponse,
  invalidateCache,
};
