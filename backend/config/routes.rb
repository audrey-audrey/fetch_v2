Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users do
        patch 'users/:id', to: 'users#update'
        resources :favorites, only: [:index, :create, :destroy]
      resources :favorites
    end
    # resources :users do
    #   get 'users/:id', to: 'users#show'
    # end
    resources :conversations, only: [:index, :create] do
      resources :messages, only: [:index, :create]
    end
       
      # resources :conversations, only: [:index, :create] do
        # resources :messages, only: [:index, create]
      # end
    # end
    resources :login, only: [:create]
    resources :register

  end
end
