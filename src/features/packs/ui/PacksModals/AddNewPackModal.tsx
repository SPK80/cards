import { ChangeEvent, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { BasicModal } from 'common/components/BasicModal/BasicModal'

type NewPackModalType = {
  addPack: (name: string, privatePack: boolean) => void
  activeModalAdd: boolean
  setActiveModalAdd: (value: boolean) => void
}

export const AddNewPackModal = (props: NewPackModalType) => {
  const [title, setTitle] = useState('')
  // const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false)

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }

  const onChangeTextFieldHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
  }
  const addPackHandler = () => {
    props.addPack(title, checked)
    setChecked(false)
    // setOpen(false)
    props.setActiveModalAdd(false)
  }

  return (
    <BasicModal
      name={'Add new pack'}
      open={props.activeModalAdd}
      setOpen={props.setActiveModalAdd}
      onSave={addPackHandler}
      nameButton={'Save'}
    >
      <TextField
        onChange={onChangeTextFieldHandler}
        id="standard-basic"
        label="Name Pack"
        variant="standard"
        sx={{ width: '100%' }}
      />
      <div>
        <FormControlLabel
          control={<Checkbox onChange={onChangeCheckboxHandler} />}
          label="Private Pack"
        />
      </div>
    </BasicModal>
  )
}