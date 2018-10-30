import React from 'react'

export const TableBody = ({ rows, columns, actions }) => {
	return (
		<tbody>
		{
		rows.map((row, index) => {
			return (
				<tr key={index} className="text-center">
				{
					columns.map((column, index) => {
						return (
							<td id={row.id} key={index}>{row[column]}</td>
						)
					})
				}
				{actions &&
					<td>
						<div className="btn-group">
						{
							actions.map((action, index) => {
								return (
									<button key={index} className={action.btn} onClick={action.action.bind(this, row.id)}>{action.title}</button>
								)
							})
						}
						</div>
					</td>
				}
				</tr>
			)
		})
		}
		</tbody>
	)
}