import React from 'react'
import './TableRow.css'

export default function TableRow({content}) {
    let {id, name, email, role} = content
  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
    </tr>
  )
}
