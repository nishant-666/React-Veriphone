import React from 'react';
import { Card, Input } from 'semantic-ui-react';
export default function VeriPhone() {
    return (
        <div className="app-body">
            <Card centered className="card-body">
                <Card.Content>
                    <div className="input-container">
                        <Input icon='search'
                            placeholder='Type a Phone Number..'
                        />
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}
