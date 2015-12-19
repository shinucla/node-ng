var gm = require('gm');

gm('/tmp/car.jpg').resize(96).write('/tmp/car_w96.jpg', function(err) { if (!err) console.log('done'); });

gm('/tmp/car.jpg').resize(96, 96).write('/tmp/car_w96_h96.jpg', function(err) { if (!err) console.log('done'); });

gm('/tmp/car.jpg').resize(96, 96, '!').write('/tmp/car_w96_h96_!.jpg', function(err) { if (!err) console.log('done'); });

gm('/tmp/car.jpg')
  .resize(96,96)
  .gravity('Center')
  .extent(96,96)
  .background('#ffffff')
  .noProfile()
  .write('/tmp/car_w96_h96_center.jpg', function(err) { if (!err) console.log('done'); });

