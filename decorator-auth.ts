import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

const app = express();
app.use(bodyParser.json());

interface IUser {
	id: number;
	name: string;
	email: string;
}

interface IRequest extends Request {
	user: IUser;
}

const users: Array<IUser> = [
	{
		id: 1,
		email: 'jaskaran@yopmail.com',
		name: 'Jaskaran Singh',
	},
];

function AuthUser(___: any, __: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;

	descriptor.value = function (req: IRequest, res: Response) {
		if (!req.headers['authorization'])
			return res.status(401).json('UNAUTHORIZED');
		req.user = users[0];
		originalMethod.call(this, req, res);
	};

	return descriptor;
}

class UserController {
	@AuthUser
	static getUserProfile(req: IRequest, res: Response) {
		res.json(req.user);
	}
}

app.get('/profile', UserController.getUserProfile);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
