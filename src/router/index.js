import { Redirect } from 'react-router-dom';
import Main from '@pages/main';
import Trans from '@pages/trans';
import Intro from '@pages/intro';
import Hist from '@pages/hist';
import UsrInfo from '@pages/usrinfo';

const routes = [
    { path: '/', exact: true, render: () => <Redirect to='/main' /> },
    { 
      path: '/main', 
      component: Main,
      routes: [
        { path: '/main', exact: true, render: () => <Redirect to='/main/transform' /> },
        { path: '/main/transform', component: Trans },
        { path: '/main/discribe', component: Intro },
        { path: '/main/history', component: Hist },
        { path: '/main/usrInfo', component: UsrInfo }
      ]
    },
];

export default routes;
