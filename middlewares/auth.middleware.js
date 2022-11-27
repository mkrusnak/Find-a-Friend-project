
const isLoggedIn = (req, res, nex) => {
    if(!req.session.user) {
        res.redirect('/')
        return;
      }
      nex();
}

const isAnon = (req, res, nex) => {
    if(req.session.user) {
        res.redirect('/')
        return;
      }
      nex();
}

module.exports = { isLoggedIn, isAnon}
