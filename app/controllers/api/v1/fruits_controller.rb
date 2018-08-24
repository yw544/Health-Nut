class Api::V1::FruitsController < ApplicationController

  URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

  def index
    render json: Fruit.all
  end

  def create
    fruit = Fruit.create(fruit_params)
    # getfood(fruit_params)
    render json: fruit
  end

  def destroy
    Fruit.destroy(params[:id])
  end

  def update
    fruit = Fruit.find(params[:id])
    fruit.update_attributes(fruit_params)
    render json: fruit
  end

  def getfood

    allf = params[:food]
    alln = allf.map { |n| (n["description"]).to_s + " " + (n["name"]).to_s }
    fquery = alln.join(" , ")
    payload = {query: "#{fquery}"}
    headers = {"x-app-id" => "9509f270", "x-app-key" => "eb598faa6204b9e713560759d5913b4e", "x-remote-user-id" => "0"}
    food = JSON.parse(RestClient.post(URL, {query: payload.to_json}, headers))
    
    render json: food["foods"].to_json

  end

  private

  def fruit_params
    params.require(:fruit).permit(:id, :name, :description)
  end
end
