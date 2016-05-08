function gulpConfig(){
    "use strict";
	
    var root = "./";
  
	var config = {
		root: root,
		browserSyncFiles: [root + "**/*"],
		browserSyncPort: 4000,
        browsers: ["chrome", "firefox"],
        sass: root + "sass/style.scss",
        css: root + "./css"
	};

	return config;
}

module.exports = gulpConfig;