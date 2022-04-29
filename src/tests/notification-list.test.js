import {act, create} from "react-test-renderer"
import Notifications from "../components/Notifications/index";
import { MemoryRouter } from "react-router-dom";

/**
 * @File Tests the rendering for a list of notificatons
 */
const notificationJson = [
  {
    "id":  "8000",
    "type": "LIKES",
    "userNotified": { "id": "456", "username": "bob" },
    "userActing": { "id": "789", "username": "alice" }, 
    "read": "false"
  }, {
    "id":  "9000",
    "type": "MESSAGES",
    "userNotified": { "id": "456", "username": "bob" },
    "userActing": { "id": "789", "username": "alice" }, 
    "read": "false"
  }, {
    "id":  "1000",
    "type": "FOLLOWS",
    "userNotified": { "id": "456", "username": "bob" },
    "userActing": { "id": "789", "username": "alice" }, 
    "read": "false"
  }
]

// test that the correct number of notifications are rendered on the screen
test('notifications list render', () => {

 let notificationsRender
 act(() => {
  notificationsRender = create(
    <MemoryRouter> <Notifications notifications={notificationJson}/> </MemoryRouter>
   )
 });
 const root = notificationsRender.root;
 const ttrNotifications = root.findAllByProps({className: 'p-2 list-group-item d-flex rounded-0'});

 expect(ttrNotifications.length)
   .toBe(notificationJson.length)
});