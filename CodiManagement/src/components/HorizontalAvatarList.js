import Avatar from 'components/Avatar';
import React, { Fragment } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'utils/propTypes';
import user1Image from '../assets/img/users/100_1.jpg';

const HorizontalAvatarList = ({
  tag: Tag,
  avatars,
  avatarProps,
  reversed,
  ...restProps
}) => {
  let leng = reversed ? avatars.length + 1 : 1;
  const count = reversed ? () => leng-- : () => leng++;

  return (
    <Tag className="d-flex align-items-center" {...restProps}>
      {avatars &&
        avatars.map(({ user_avatar, user_first_name, user_last_name}, i) => {
          const index = count();
          const isFirstItem = i === 0;

          return (
            <Fragment key={index}>
              <Avatar
              className="avatarsList"
                {...avatarProps}
                id={`HorizontalAvatarList-avatar-${index+user_first_name+user_last_name}`}
                src={user1Image}
                style={{
                  zIndex: index,
                  border: '3px solid #fff',
                  marginLeft: !isFirstItem && -20,
                  marginBottom: '1px',
                  marginTop:'1px'
                }}
              />

              {!!user_first_name && (
                <UncontrolledTooltip
                  delay={{ show: 0, hide: 0 }}
                  target={`HorizontalAvatarList-avatar-${index+user_first_name+user_last_name}`}>
                  {user_first_name+" "+user_last_name}
                </UncontrolledTooltip>
              )}
            </Fragment>
          );
        })}
    </Tag>
  );
};

HorizontalAvatarList.propTypes = {
  tag: PropTypes.node,
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      user1Image: PropTypes.string.isRequired,
     user_first_name: PropTypes.string,
    })
  ).isRequired,
  avatarProps: PropTypes.object,
  reversed: PropTypes.bool,
};

HorizontalAvatarList.defaultProps = {
  tag: 'div',
  avatars: [],
  avatarProps: {},
  reversed: false,
};

export default HorizontalAvatarList;
