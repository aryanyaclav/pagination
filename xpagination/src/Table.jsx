import React from 'react'
import TableRow from './TableRow'
import './Table.css'

export default function Table({headings, body}) {
  return (
    <div className="tableContainer">
        <table>
            <thead>
                <tr>
                {
                    headings.map((heading, headId) => {
                        return <th key={headId}>{heading}</th>
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    body.map((content, contentId) => {
                        return <TableRow content={content} key={contentId} />
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
