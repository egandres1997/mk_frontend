import React from 'react'

import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

export const Table = ({ rows, columns, actions }) => {
	return (
	  	<table className="table">
			<TableHeader columns={columns} actions={actions} />
			<TableBody rows={rows} columns={columns} actions={actions} />
	  	</table>
	)
}