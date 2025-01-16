// export const loadIGAccount = () => {
// 	return (
// 		<>
// 			{typeof window !== 'undefined' &&
// 				(window.fbAsyncInit = function () {
// 					FB.init({
// 						appId: '311994885263192',
// 						cookie: true,
// 						xfbml: true,
// 						version: 'v19.0',
// 					});

// 					FB.AppEvents.logPageView();
// 				})}
// 			{typeof window !== 'undefined' &&
// 				(function (d, s, id) {
// 					let js,
// 						fjs = d.getElementsByTagName(s)[0];
// 					if (d.getElementById(id)) {
// 						return;
// 					}
// 					js = d.createElement(s);
// 					js.id = id;
// 					js.src = 'https://connect.facebook.net/en_US/sdk.js';
// 					fjs.parentNode.insertBefore(js, fjs);
// 				})(document, 'script', 'facebook-jssdk')}
// 		</>
// 	);
// };

export const initFacebookSdk = () => {
	return new Promise<void>((resolve, reject) => {
		// Load the Facebook SDK asynchronously
		window.fbAsyncInit = () => {
			window.FB.init({
				appId: '1268250524120464',
				cookie: true,
				xfbml: true,
				version: 'v16.0',
			});
			// Resolve the promise when the SDK is loaded
			resolve();
		};
	});
};

export const getFacebookLoginStatus = () => {
	return new Promise((resolve, reject) => {
		window.FB.getLoginStatus((response) => {
			resolve(response);
		});
	});
};

export const fbLogin = () => {
	return new Promise((resolve, reject) => {
		window.FB.login((response) => {
			resolve(response);
		});
	});
};
