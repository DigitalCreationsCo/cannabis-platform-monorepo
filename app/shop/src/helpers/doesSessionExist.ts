import Session from 'supertokens-web-js/recipe/session';

async function doesSessionExist() {
	return Session.doesSessionExist();
}

export default doesSessionExist;
