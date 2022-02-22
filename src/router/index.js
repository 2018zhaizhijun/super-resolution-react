import { Redirect } from 'react-router-dom';
import Main from '@pages/main';
import Trans from '@pages/trans';
// import Intro from '@pages/intro';
// import Hist from '@pages/hist';
// import UsrInfo from '@pages/usrinfo';
// import Page404 from '@pages/page404';
import loadable from './loadable.js';

const AsyncIntro = loadable(() => import('@pages/intro'));
const AsyncHist = loadable(() => import('@pages/hist'));
const AsyncUsrInfo = loadable(() => import('@pages/usrinfo'));
const AsyncPage404 = loadable(() => import('@pages/page404'));

const routes = [
    { path: '/', exact: true, render: () => <Redirect to='/main' /> },
    { 
      path: '/main', 
      component: Main,
      routes: [
        { path: '/main', exact: true, render: () => <Redirect to='/main/transform' /> },
        { path: '/main/transform', component: Trans },
        { path: '/main/discribe', component: AsyncIntro },
        { path: '/main/history', component: AsyncHist },
        { path: '/main/usrInfo', component: AsyncUsrInfo },
        { path: '*', component: AsyncPage404 },
      ]
    },
    { path: '*', component: AsyncPage404 },
];

export default routes;
