Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users do
        get 'users/:id', to: 'users#show'
        # get 'users/:id/favorites', to: 'favorites#index'
        resources :favorites
    end
       
      # resources :conversations, only: [:index, :create] do
        # resources :messages, only: [:index, create]
      # end
    # end
    resources :login, only: [:create]
    resources :register

  end
end
