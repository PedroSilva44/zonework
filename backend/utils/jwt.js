import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY || 'borapracima';

export function generateToken(userInfo) {
  // garantir que servico exista
  if (!userInfo.servico)
    userInfo.servico = 'candidato';

  return jwt.sign(userInfo, KEY, { expiresIn: '24h' });
}

export function getTokenInfo(req) {
  try {
    let token = req.headers['x-access-token'];

    if (token === undefined)
      token = req.query['x-access-token'];

    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    return null;
  }
}

export function getAuthentication(checkRole, throw401 = true) {  
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
  
      if (token === undefined)
        token = req.query['x-access-token'];
    
      let signd = jwt.verify(token, KEY);
    
      req.user = signd;
      // checkRole é opcional e pode ser uma função que recebe o payload do token
      if (checkRole && typeof checkRole === 'function' && !checkRole(signd) && signd.servico !== 'empresa')
        return resp.status(403).end();
    
      next();
    }
    catch (err) {
      if (throw401) {
        resp.status(401).end();
      }
      else {
        next();
      }
    }
  }
}
