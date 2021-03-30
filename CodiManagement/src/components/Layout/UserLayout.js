import { Content, Footer,Sidebar } from 'components/Layout';
import UserHeader from './UserHeader'
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class UserLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
   

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: 'Welcome to Codi Tech Dashboard',
        level: 'info',
      });
    }, 2500);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdLoyalty />,
        message:
          'Codi is a free school of programming for people who have a passion for digital and want to build a career in technology but cannot pursue a traditional university education.',
        level: 'info',
      });
    }, 3500);
  }

 

  



  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        
        <Content fluid onClick={this.handleContentClick}>
          {/* <UserHeader /> */}
          {children}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default UserLayout;
