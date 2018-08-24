Rails.application.routes.draw do

  root to: 'home#index'
  namespace :api do
    namespace :v1 do
     resources :fruits, only: [:index, :create, :destroy, :update]
     post 'getfood', to: "fruits#getfood"
    end
  end

  resources :users

  get 'sessions/login'
  get 'sessions/home'
  get 'sessions/profile'
  get 'sessions/setting'
  get 'sessions/login_attempt'
  get 'users/new'



  root to: "sessions#login"
  get "signup", to: "users#new"
  get "login", to: "sessions#login"
  get "logout", to: "sessions#logout"
  get "home", to: "sessions#home"
  get "profile", to: "sessions#profile"
  get "setting", to: "sessions#setting"
  post 'login', to: "sessions#profile"
  post "users/new", to: "sessions#profile"

end
