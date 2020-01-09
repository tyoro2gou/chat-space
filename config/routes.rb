Rails.application.routes.draw do
  devise_for :users
  get 'messages/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'groups#index'
  resources :users,    only: [:edit, :update]
  resources :groups,   only: [:index,:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end
