import exprss, { Router} from "express";
import { taskController } from "../controllers/task";
import { taskValidator} from "../../utils/taskValidator";
import { updateValidator } from "../../utils/taskValidator";

const router:Router = exprss.Router();

router.get('/', taskController.getAllTask)

router.post('/', taskValidator , taskController.createTask)

router.put('/', updateValidator, taskController.updateTask)


export default router;