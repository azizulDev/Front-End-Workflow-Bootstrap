// include jQuery
let $ = require('jquery');

// include Bootstrap js
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';




// custom js ..
import Bio from './modules/Bio';

let bio = new Bio('Azizul', 23);
bio.aboutMe();
