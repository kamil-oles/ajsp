import angular from 'angular';

import { SIDE_MENU_COMPONENT } from './side-menu.component';
import { SIDE_MENU_ITEM_COMPONENT } from './side-menu-item/side-menu-item.component';
import { SUBMENU_ITEM_COMPONENT } from './side-menu-item/submenu-item/submenu-item.component';

import './side-menu.scss';
import './side-menu-item/side-menu-item.scss';
import './side-menu-item/submenu-item/submenu-item.scss';

export const APP_SIDE_MENU = angular
  .module('appSideMenu', [])
  .component('appSideMenu', SIDE_MENU_COMPONENT)
  .component('appSideMenuItem', SIDE_MENU_ITEM_COMPONENT)
  .component('appSubmenuItem', SUBMENU_ITEM_COMPONENT)
  .name;