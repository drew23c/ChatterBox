+import React, {Component} from 'react';
+import {Switch, Route} from 'react-router-dom';
+import {Room} from '../TV-info/Info';
+import '../../src/chatpg.css';
+
+class Chat extends Component {
+    constructor() {
+        super();
+    }
+
+    renderRoom = (props) => {
+        const { showid} = props.match.params;
+        return (
+            <Room showid={showid} />
+        )
+    }
+
+    render() {
+        return (
+            <div>
+                <Switch>
+                    <Route path="/chat/:name/:showid" render={this.renderRoom} />
+                </Switch>
+            </div>
+        )
+    }
+}
+
+export default Chat; 