import { User } from "@gras/data-access";
import { useIsLegalAge } from "hooks";

describe('useIsLegal ', () => {
	test(' values should be false', () => {
        const user = {} as User
		expect(useIsLegalAge(user).isLegalAge).toBe(false);
	});
});
