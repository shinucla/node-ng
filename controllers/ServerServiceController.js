//
// Product Controller
//

module.exports = function(app) {
   app
    .route('/serverservice/testexec')
    .post(function(req, res) {
      var data = req.body;
      res.end(JSON.stringify(
        {success : 'Updated Successfully', 
         status : 200,
         result: {text: 'test exec success!!'}
        }
      ));
    });

};
