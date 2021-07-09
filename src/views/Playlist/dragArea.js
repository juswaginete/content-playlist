import React from 'react';

import './index.scss';
import Copyable from './copyable';


export default function DragArea(props) {
  return <Copyable droppableId="SHOP" className="drag" items={props.items} />
}
