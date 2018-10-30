import React from 'react'

export const TableHeader = ({ columns, actions }) => {
	return (
		<thead>
			<tr className="info">
				{	
				columns.map((column, index) => {
					return (
						<th 
							key={index} 
							style={{whiteSpace:'nowrap',width:'1%'}} 
							className="text-center"
						>
							{column}
						</th>
					)
				})
				}
				{
				actions &&
				<th style={{whiteSpace:'nowrap',width:'1%'}} className="text-center">Acciones</th>
				}
			</tr>
		</thead> 
	)
}