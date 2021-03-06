import React from 'react';
import { Card, Image, Rating, Grid, Button } from 'semantic-ui-react';
import './StoreItem.css'

const StoreItem = (props) => {
	const URL = '/items/' + props.item.id;

function handleClick(){

	props.addToBasket(props.item)
}

function checkStock(){
	const minusStock = props.item.stock.totalDamaged + props.item.stock.totalLost + props.item.stock.totalSold
	const plusStock = props.item.stock.totalBought + props.item.stock.totalRefunded
	const totalStock = plusStock - minusStock

	if(totalStock <= 0){
		return (
			<Button 
						color='red'
						compact
						disabled
						floated="right"
					>
						Out of Stock
					</Button>
		)
	}

	if (totalStock >= 5){
		return (
			<Button 
						primary
						compact
						floated="right"
						onClick={handleClick}
					>
						Add To Cart
					</Button>
		)
	}

	if (totalStock <5 && totalStock > 0){
		return (
			<Button 
						color='yellow'
						compact
						floated="right"
						onClick={handleClick}
					>
						Low Stock
						Add to Cart
					</Button>
		)
	}
}

	return (
		<Grid.Column>
			<Card 
				raised
				id="card"
			>
				<Image 
					src={props.item.imgUrl[0]} 
					href={URL}
				/>

				<Card.Content>
					<Card.Header>
						<a href={URL}>{props.item.name} </a>
					</Card.Header>
					<Card.Meta>
						<Rating 
							icon="star" 
							defaultRating={3} 
							maxRating={5} 
						/>
					</Card.Meta>
					<Card.Description>
						Price: £{props.item.currentSellPrice}
					</Card.Description>
				</Card.Content>

				<Card.Content extra>
					{checkStock()}
				</Card.Content>
			</Card>
		</Grid.Column>
	);
};

export default StoreItem;
