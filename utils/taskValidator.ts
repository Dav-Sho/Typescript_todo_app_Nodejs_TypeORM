import {body, ValidationChain} from 'express-validator'
import { Priority } from '../src/enums/Priority'
import { Status } from '../src/enums/Status'

export const taskValidator: ValidationChain[] = [
    body("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .trim()
    .isString()
    .withMessage("Title must be text"),

    body('date')
    .not()
    .isEmpty()
    .withMessage("Task date is required")
    .isString()
    .withMessage("The date needs to be a valid date format"),

    body("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .trim()
    .isString()
    .withMessage("Description must be text"),

    body('priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.normal])
    .withMessage("Priority can only be normal, high, low"),

    body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage("Status can only be complete, inprogress, todo")
]

export const updateValidator: ValidationChain[] = [
    body('id')
    .not()
    .isEmpty()
    .withMessage("Task id is required")
    .trim()
    .isString()
    .withMessage("Task id must be string"),
    
    body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be  completed, inprogress, todo')
]