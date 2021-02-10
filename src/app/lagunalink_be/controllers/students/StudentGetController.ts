import {Request, Response} from 'express';
import {Controller} from '../Controller';
import {Token} from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import {Payload} from '../../../../Contexts/LLBE/Users/domain/Payload';
import {AuthRole} from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import {AuthChecker} from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import {StudentFinder} from '../../../../Contexts/LLBE/Students/application/Find/StudentFinder';
import {StudentId} from '../../../../Contexts/LLBE/Shared/domain/Students/StudentId';

// noinspection SpellCheckingInspection
export class StudentGetController implements Controller {
    private finder: StudentFinder;
    private authChecker: AuthChecker;
    private authRoleChecker: AuthRole;

    constructor(studentFinder: StudentFinder, authChecker: AuthChecker, authRole: AuthRole) {
        this.authChecker = authChecker;
        this.finder = studentFinder;
        this.authRoleChecker = authRole;
    }

    async run(req: Request, res: Response) {

        if (req.headers.authorization === null) {
            res.status(httpStatus.PAYMENT_REQUIRED).send();
        }
        const token = new Token(req.headers.authorization as string);
        let payload: Payload;
        try {
            payload = this.authChecker.check(token);
        } catch (e) {
            res.status(402).send({message: e.message});
        }

        try {
            // @ts-ignore
            this.authRoleChecker.check(payload);
        } catch (e) {
            res.status(400).send({error: e.message});
        }

        // @ts-ignore
        if (payload.userId !== req.params.id) {
            res.status(403).send();
        }

        const student = await this.finder.run(new StudentId(req.params.id));

        res.status(200).send({student: student.toPrimitives()});
    }
}
