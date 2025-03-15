import EquipmentList from '@/components/admin/equipments/equipment-list'
import CMSLayout from '@/layouts/cms-layout'
import React from 'react'

const Equipment: React.FC = () => {
  return (
    <CMSLayout>
      <EquipmentList/>
    </CMSLayout>
  )
}

export default Equipment
