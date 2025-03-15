import GroupUserList from '@/components/admin/group-users/group-list'
import CMSLayout from '@/layouts/cms-layout'
import React from 'react'

const GroupUser: React.FC = () => {
  return (
    <CMSLayout>
      <GroupUserList></GroupUserList>
    </CMSLayout>
  )
}

export default GroupUser
