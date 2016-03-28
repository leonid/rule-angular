import './blog.css';

import angular from 'angular';

import routing from './blog.routes.js';
import BlogController from './blog.controller.js';

export default angular
  .module( 'app.blog', [] )
  .config( routing )
  .controller( 'BlogController', BlogController )
  .name;
