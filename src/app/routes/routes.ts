import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { contactRouter } from '../modules/contact/contact.routes';
import { subscriptionRouter } from '../modules/subscription/subscription.routes';
import { transferhistoryRouter } from '../modules/transferhistory/transferhistory.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/contact',
    route: contactRouter,
  },
  {
    path: '/subscription',
    route: subscriptionRouter,
  },
  {
    path: '/transferhistory',
    route: transferhistoryRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
